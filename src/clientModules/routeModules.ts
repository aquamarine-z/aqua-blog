import mitt from 'mitt';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const emitter = mitt();

if (ExecutionEnvironment.canUseDOM) {
    // @ts-ignore
    window.emitter = emitter;
}

export function onRouteDidUpdate() {
    if (ExecutionEnvironment.canUseDOM) {
        setTimeout(() => {
            // @ts-ignore
            window.emitter.emit('onRouteDidUpdate');
        });
    }
    // https://github.com/facebook/docusaurus/issues/8278
}