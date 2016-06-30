var _ = require('lodash');
var Cat = require('./cat_model.js')

module.exports = function (app) {
    _cats = [];

    /* Create Cat */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({
                    info: 'Error during cat create',
                    error: err
                });
            };
            res.json({
                info: 'Cat created successfully'
            })
        });
    });

    /* Get all cats */
    app.get('/cat', function (req, res) {
        Cat.find(function (err, cats) {
            if (err) {
                res.json({
                    info: 'Error during find cats',
                    error: err
                })
            };
            res.json({
                info: 'Cats found successfully',
                data: cats
            });
        });
    });

    /* Read a specific cat by id */
    app.get('/cat/:id', function (req, cat) {
        Cat.findById(req.params.id, function name(req, cat) {
            if (err) {
                res.json({
                    info: 'Error during find cat',
                    error: err
                })
            };

            if (cat) {
                res.json({
                    info: 'Cat found successfully',
                    data: cat
                })
            }
            else {
                res.json({
                    info: 'Cats found successfully',
                    data: cats
                })
            }

        })

    });

    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            };
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function(err) {
                    if (err) {
                        res.json({info: 'error during cat update', error: err});
                    };
                    res.json({info: 'cat updated successfully'});
                });
            } else {
                res.json({info: 'cat not found'});
            }

        });
    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove cat', error: err});
            };
            res.json({info: 'cat removed successfully'});
        });
    });
}