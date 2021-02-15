const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Board } = require("../models/Board");

//=================================
//             Board
//=================================

router.post('/save', (req, res) => {
    //받아온 정보들을 DB 저장함
    const board = new Board(req.body);
    board.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
})

router.post("/list", (req, res) => {
    //콜렉션에 들어있는 상품정보 가져오기
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;
    //필터 적용하기 req.body.filters
    let findArgs = {};

    //텍스트 검색시 의 조건

    if (term) {
        Board.find(findArgs)
            .find({ $text: { $search: term } }) //텍스트적용 하는곳
            .populate("writer")
            .sort({ createdAt: -1 })
            .skip(skip) //가져올 인덱스 전달
            .limit(limit)// 몽고디비에 가져올 숫자를 던져줌
            .exec((err, boardList) => {
                if (err) return res.status(400).json({ success: false, err })
                //돌아오는 값에 컬렉션 갯수를 추가해줌(postSize)
                res.status(200).json({ success: true, boardList, postSize: boardList.length })
            })
    } else {
        Board.find(findArgs)
            .populate("writer")
            .sort({ createdAt: -1 }) //내림차순
            .skip(skip) //가져올 인덱스 전달
            .limit(limit)// 몽고디비에 가져올 숫자를 던져줌
            .exec((err, boardList) => {
                if (err) return res.status(400).json({ success: false, err })
                //돌아오는 값에 컬렉션 갯수를 추가해줌(postSize)
                res.status(200).json({ success: true, boardList, postSize: boardList.length })
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
})

module.exports = router;