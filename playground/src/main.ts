import { createApp } from 'vue'
import PlayComponents from '../../src/components/index'
import App from './App.vue'
import './style.css'
import 'virtual:uno.css'

function setupComponents(app) {
    console.log(1111, PlayComponents)

    Object.keys(PlayComponents).forEach((key) => {
        const component = PlayComponents[key]
        if (component.install) {
            app.use(component)
        } else if (component.name) {
            app.component(component.name, component)
        }
    })
    return app
}

setupComponents(createApp(App)).mount('#app')
