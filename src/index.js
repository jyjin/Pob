// import printMe from './print.js'
// import _ from 'lodash'
// import './style.css'
import {cube} from './math.js'

// function component() {
//     var element = document.createElement('div')
//     var btn = document.createElement('button')

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ')
//     btn.innerHTML = '点我并查看控制台'
//     btn.onclick = printMe;

//     element.appendChild(btn)

//     return element
// }


// document.body.appendChild(component())

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('接受更新的printMe模块')
//         printMe()
//     })
// }


// let element = component()
// document.body.appendChild(element)

// if(module.hot){
//     module.hot.accept('./print.js', function(){
//         console.log('Accepting the updated printMe module!')
//         document.body.removeChild(element)
//         element = component()
//         document.body.appendChild(element)
//     })
// }


function component(){
    var element = document.createElement('pre')

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to '+ cube(5)
    ].join('\n\n')
    
    return element
}

document.body.appendChild(component())