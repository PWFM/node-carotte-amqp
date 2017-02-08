const expect = require('chai').expect;
const carotte = require('../src')();

describe('rpc', () => {
    it('should be able to receive a response from a queue', () => {
        return carotte.subscribe('direct/hello-rpc', { queue: { exclusive: true } }, () => {
            return { a: 1 };
        })
        .then(() => {
            return carotte.invoke('direct/hello-rpc', {}, {})
                .then(({ data }) => {
                    expect(data).to.be.defined;
                    expect(data.a).to.be.eql(1);
                });
        });
    });

    it('should receive response on data object', () => {
        carotte.subscribe('direct/hello-rpc2', { queue: { exclusive: true } }, ( { data }) => {
            return { a: 2 };
        })
        .then(() => {
            return carotte.invoke('direct/hello-rpc2', {})
                .then(({ data }) => {
                    expect(data).to.be.defined;
                    expect(data.a).to.be.eql(2);
                });
        });
    });

    it('should not handle RPC response if consumer respond with bad correlation ID', (done) => {
        carotte.subscribe('direct/hello-rpc3', { queue: { exclusive: true } }, ( { data, headers }) => {
            try {
                headers['x-correlation-id'] = 'toto';
                setTimeout(done, 1000);
                return { a: 2 };
            } catch(err) {
                done(err);
            }
        })
        .then(() => {
            carotte.invoke('direct/hello-rpc3', {})
                .then(({ data }) => {
                    done(new Error('Should not execute callback'));
                });
        });
    });
});