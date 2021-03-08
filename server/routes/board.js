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
            // .find({ $text: { $search: term } }) //텍스트적용 하는곳
            .find({
                // "title": { '$regex': term },
                "description": { '$regex': term },
            })
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
})

module.exports = router;