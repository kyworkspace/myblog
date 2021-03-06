const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Picture } = require("../models/Picture");

//=================================
//             Picture
//=================================

//가져온 이미지를 저장 해주면 됨
var storage = multer.diskStorage({
    //파일이 저장되는 물리적인 경로
    destination: function (req, file, cb) {
        cb(null, 'uploads/picture/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {
    upload(req, res, (err) => {
        //실패했을때
        if (err) return res.json({ success: false, err });
        console.log(res.req.file)
        //성공했을때 경로와 파일을 전달해줌
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/save', (req, res) => {
    //받아온 정보들을 DB 저장함
    const picture = new Picture(req.body);
    picture.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
})
router.post("/pictures", (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;
    //필터 적용하기 req.body.filters
    let findArgs = {};
    for (let key in req.body.filters) {
        //key => continents or price
        // if (req.body.filters[key].length > 0) {//각 필터가 있을때
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                }
            }else if(key === 'pictureCount' && req.body.filters[key] > 0 ){
                findArgs["images"] = {$size : req.body.filters[key]};
            } else if (key === "dateRange" && req.body.filters[key].length>0 ) {
                findArgs['createdAt'] = { $gte: new Date(req.body.filters[key][0]), $lte: new Date(req.body.filters[key][1]) };
            }
            //  else {
            //     findArgs[key] = req.body.filters[key];
            // }
        // }
    }
    //텍스트 검색시 의 조건
    if (term) {
        Picture.find(findArgs)
            // .find({ $text: { $search: term } }) //텍스트적용 하는곳
              .find({  
                "title": { '$regex': term },
                "description": { '$regex': term },
             })
            .populate("writer")
            .skip(skip) //가져올 인덱스 전달
            .limit(limit)// 몽고디비에 가져올 숫자를 던져줌
            .exec((err, pictureInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                //돌아오는 값에 컬렉션 갯수를 추가해줌(postSize)
                res.status(200).json({ success: true, pictureInfo, postSize: pictureInfo.length })
            })
    } else {
        Picture.find(findArgs)
            .populate("writer")
            .skip(skip) //가져올 인덱스 전달
            .limit(limit)// 몽고디비에 가져올 숫자를 던져줌
            .exec((err, pictureInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                //돌아오는 값에 컬렉션 갯수를 추가해줌(postSize)
                res.status(200).json({ success: true, pictureInfo, postSize: pictureInfo.length })
            })
    }

    //picturedetail
    router.get('/picturedetail', (req, res) => {
        //productId를 이용해서 DB에서 같은 상품의 정보를 가져온다.
        let type = req.query.type;
        let pictureIds = req.query.id;
        //type 이 싱글일때는 1개 정보만 가져오고
        //arry 일때는 여러개 가져옴 ==>id=11122,333,22211,....
        if (type === "array") {
            //productIds를 배열형태로 바꿔줘야함
            let ids = req.query.id.split(",")
            pictureIds = ids.map(item => {
                return item;
            });
        }
        Picture.find({ _id: { $in: pictureIds } })
            .populate('writer')
            .exec((err, product) => {
                if (err) return res.status(400).send({ success: false, err })
                return res.status(200).send(product)
            })

    })
    //pictureDelete
    router.post('/delete', (req, res) => {
        let pictureId = req.body.pictureId;

        Picture.deleteOne({ _id: pictureId })
            .exec((err) => {
                if (err) return res.status(400).send({ success: false, err })
                return res.status(200).send({ success: true })
            })

    })
    //사진 수정
    router.post('/update', (req, res) => {
        let pictureId = req.body.pictureId;
        console.log(req.body.images)

        Picture.findByIdAndUpdate({ _id: pictureId },
            {
                $set: {
                    images: req.body.images,
                    title: req.body.title,
                    description: req.body.description,
                    tags: req.body.tags
                }
            },
            (err) => {
                if (err) return res.status(400).send({ success: false, err })
                return res.status(200).send({ success: true })
            })
    })
})

module.exports = router;