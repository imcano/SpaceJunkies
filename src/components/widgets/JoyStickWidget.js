import React, {Component} from 'react';

import JoyStick from '../../Wrapper/JoyStick';

const joyOptions = {
    mode: 'static',
	catchDistance: 150,
	color: 'white',
	position: {top: '50%', left: '50%'}
}

const containerStyle = {
	position: 'relative',
    height: '150px',
    width: '100%',
    background: 'black'
}

class JoyWrapper extends Component {
    constructor() {
        super();
        this.managerListener = this.managerListener.bind(this);
        this.managerListener2 = this.managerListener2.bind(this);
        this.state = {
            rasberyPy: false
        }
    }
    componentDidMount(){
        if (window.location.host === "localhost:3000") {
            this.socket = new WebSocket('ws://localhost:3030')
        } else {
            //change to our IP address
            this.socket = new WebSocket('ws://142.93.25.132:3030')
        }
        this.socket.onmessage =  (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "users") {
                this.setState({rasberyPy: data.rp_status});
            }
        }
        //keyboard movement
        document.addEventListener('keydown', (event) => {
            if (event.defaultPrevented) {
                return;
            }

            let key = event.key || event.keyCode

            if(key === ' ') {
                this.socket.send(JSON.stringify({direction: "stop"}))
            }
            if(key === 'W' || key === 'w') {
                this.socket.send(JSON.stringify({direction: 'up'}))
            }
            if(key === 'A' || key === 'a') {
                this.socket.send(JSON.stringify({direction: "left"}))
            }
            if(key === 'S' || key === 's') {
                this.socket.send(JSON.stringify({direction: "down"}))
            }
            if(key === 'D' || key === 'd') {
                this.socket.send(JSON.stringify({direction: "right"}))
            }
            if(key === 'Q' || key === 'q') {
                this.socket.send(JSON.stringify({direction: "rotateX"}))
            }
            if(key === 'E' || key === 'e') {
                this.socket.send(JSON.stringify({direction: "rotateY"}))
            }
        })
    }
    //regular movements
    managerListener(manager) {
        manager.on('move', (e, stick) => {
            if (stick.direction) {
                this.socket.send(JSON.stringify({direction: stick.direction.angle}));
            }
        })
        manager.on('end', () => {
			this.socket.send(JSON.stringify({direction: 'stop'}));
        })
        
    }
    //rotation movement
    managerListener2(manager) {
        manager.on('move', (e, stick) => {
            if (stick.direction.angle === 'up') {
                this.socket.send(JSON.stringify({direction: "rotateY"}));
            }
            if (stick.direction.angle === 'down') {
                this.socket.send(JSON.stringify({direction: "rotateX"}));
            }
            if (stick.direction.angle === 'left') {
                this.socket.send(JSON.stringify({direction: "rotateX"}));
            }
            if (stick.direction.angle === 'right') {
                this.socket.send(JSON.stringify({direction: "rotateY"}));
            }
        })
        manager.on('end', () => {
			this.socket.send(JSON.stringify({direction: 'stop'}));
        })
        
    }

    render() {
        const { rasberyPy } = this.state;
        return (
            <div>
                { rasberyPy ?
                    <React.Fragment>
                        <h2 className='text-center'>Direction</h2>
                        <JoyStick options={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
                        <h2 className='text-center'>Rotation</h2>
                        <JoyStick options={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener2} />
                    </React.Fragment>
                    :
                    <h1>Connect RP</h1>
                }
            </div>
        )
    }
}

export default JoyWrapper;