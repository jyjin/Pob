exports.getUserInfo = (req, res) => {
    return res.send({
        res: 1,
        data: {
            name: 'jyjin',
            age: 26
        }
    })
}