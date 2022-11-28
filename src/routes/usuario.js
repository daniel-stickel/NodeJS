const express = require('express')
const router = express.Router();
const db = require('../../mysql').pool;


router.get('/', (req, res, next) => {

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            'select codigo, nome from usuario',
            (error, result, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({ error: error });
                }

                return res.status(200).send({
                    response: result
                })
            }
        )
    });

});

router.post('/', (req, res, next) => {
    db.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        conn.query(
            'insert into usuario(nome) values(?)',
            [req.body.nome],
            (error, result, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }
                res.status(201).send({
                    mensagem : 'Usuario inserido com sucesso',
                    codigo: result.codigo
                })
            }
        )
    })
})



module.exports = router;