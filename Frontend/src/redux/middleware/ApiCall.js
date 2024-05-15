const promiseMiddleware = () => {

    return next => action => {
        const { promise, type, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';

        next({ ...rest, type: REQUEST });

        return promise
            .then((_response) => {
                next({ ...rest, type: SUCCESS, response: _response });
                return true;
            }).catch((_err) => {
                next({ ...rest, type: FAILURE, error: _err });
                return false;
            });

    };

};

export default promiseMiddleware;
