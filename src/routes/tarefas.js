const express = require('express')
const router = express.Router();
const db = require('../../mysql').pool;

router.get('/', (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            'select descricao, codigo_usuario from tarefas',
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
            'insert into tarefas (descricao, codigo_usuario) values(?, ?)',
            [req.body.descricao, req.body.codigo_usuario],
            (error, result, fields) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }
                res.status(201).send({
                    mensagem: 'tarefa inserida com sucesso'
                })
            }
        )
    })
});

router.get('/:codigo', (req, res, next) => {
    db.getConnection((error, conn) => {

        const codigoParametro = req.params.codigo;

        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            'select descricao, codigo_usuario from tarefas where codigo = ? ',
            codigoParametro,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error });
                }

                return res.status(200).send({
                    result
                })
            }
        )
    });
});

router.delete('/:codigo_usuario/?', (req, res, next) => {
    db.getConnection((error, conn) => {

        const codigoParametro = req.params.codigo_usuario;

        if (error) {
            return res.status(500).send({ error: error });
        }

        conn.query(
            'delete from tarefas where codigo_usuario=?',
            codigoParametro,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error });
                }

                res.status(201).send({
                    mensagem: 'Campo deletado com sucesso'
                })
            }
        )
    });
});

router.post('/', (req, res, next) => {

})


module.exports = router;