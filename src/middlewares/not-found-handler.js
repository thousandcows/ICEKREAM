function notFoundHandler(req, res, next) {
    res.status(404).redirect('/notfound');
}

export { notFoundHandler };
