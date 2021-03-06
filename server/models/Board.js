const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, //포린키 같은 개념
        ref: 'User' //User 모델을 가서 스키마 정보를 전부 가져옴
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number
    },
    views: { //조회수
        type: Number,
        default: 0
    }

}, { timestamps: true });
boardSchema.index({
    description: 'text',
}, {
    weights: {
        description: 5
    }
})
//timestamps ==> 만들날과 업데이트한 날이 기록되어 표시됨

const Board = mongoose.model('Board', boardSchema); //컬렉션(테이블)명, 스키마, 사용자정의명(여기선안씀)

module.exports = { Board }