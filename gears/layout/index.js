import header from 'header';
import footer from 'footer';
import content from 'content';

export default {
    init() {
        console.log('> init layout');
        [header, content, footer].forEach(mod => mod.init());
    },
    start() {
        console.log('> start layout');
        [header, content, footer].forEach(mod => mod.start());
    }
};
