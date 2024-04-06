function idInterceptorResponse(payload) {
    const transformObject = (obj) => {
        const {_id, ...rest} = obj;

        return {
            id: _id,
            ...rest
        }
    }

    // if the payload is an array, then we apply the transformation to each element
    if (Array.isArray(payload))
        return payload.map(transformObject)

    return transformObject(payload);

}

export default idInterceptorResponse;
