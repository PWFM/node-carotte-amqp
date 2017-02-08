const EXCHANGE_TYPE = {
    DIRECT: 'direct',
    HEADERS: 'headers',
    FANOUT: 'fanout',
    TOPIC: 'topic'
};

const EXCHANGES_AVAILABLE = [
    EXCHANGE_TYPE.DIRECT,
    EXCHANGE_TYPE.HEADERS,
    EXCHANGE_TYPE.FANOUT,
    EXCHANGE_TYPE.TOPIC
];

module.exports = {
    EXCHANGES_AVAILABLE,
    EXCHANGE_TYPE
};

