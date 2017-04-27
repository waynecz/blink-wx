const express = require('express');
const router = express.Router();
const axios = require('axios')

const host = 'http://114.215.110.36:8989/api/v1'

router.get('/:id', async (req, res, next) => {
    let actId = req.params.id
    let banner
    try {
        let res1 = await axios.get(host + `/activities/${actId}/`)
        let title = res1.data.name

        let res2 = await axios.get(host + `/activities/${actId}/banners/`)
        if (res2.data.results.length > 0) {
            banner = res2.data.results[0].file + '?imageView2/2/w/800/h/3000/q/75'
        }

        res.renderPage('index', {
            title: title,
            banner: banner
        });
    } catch (e) {
        console.log(e)
        res.renderPage('index', {
            title: '出错啦'
        });
    }

});

router.use('/api/v1', require('./ajax'));

module.exports = router;

