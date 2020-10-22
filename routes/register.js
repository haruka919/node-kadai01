const router = require('express').Router();
const register = require('../controllers/registerController')

router.get('/', register.show);

// 外部ファイル化したバリデーション読み込み
const RegistValidator = require('../validators/RegistValidator');
// ユーザー登録の送信処理
router.post('/', RegistValidator, register.create);

module.exports = router;
