const Quake2 = require('./quake2');

class FiveM extends Quake2 {
    constructor() {
        super();
        this.sendHeader = 'getinfo xxx';
        this.responseHeader = 'infoResponse';
        this.encoding = 'utf8';
    }

    async run(state) {
        await super.run(state);

        {
            const raw = await this.request({
                uri: 'http://' + this.options.address + ':' + this.options.port_query + '/info.json'
            });
            const json = JSON.parse(raw);
            state.raw.info = json;
        }

        {
            const raw = await this.request({
                uri: 'http://' + this.options.address + ':' + this.options.port_query + '/players.json'
            });
            const json = JSON.parse(raw);
            state.raw.players = json;
            state.players = [];
            for (const player of json) {
                state.players.push({name: player.name, ping: player.ping});
            }
        }
    }
}

module.exports = FiveM;
