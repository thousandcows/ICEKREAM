function adminRequired(req, res, next) {
    // 터미널에 노란색으로 출력됨.
    const role = req.user.role;
    console.log(role);
    if (role === 'admin') {
        next();
    } else {
        throw new Error('admin 권한이 없습니다.');
    }
}

export { adminRequired };
