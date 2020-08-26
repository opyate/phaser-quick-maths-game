import Phaser from 'phaser'

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      }
    })
  }

  onClick(pointer) {
    const result = parseInt(this.text.text) === this.answer
    console.log(result)
  }

  addChallenge() {

    const items = ['7' , '*', '3', '=', '?']
    const answer = eval(items.slice(0,3).join(' '))


    items.forEach((item, idx) => {
      this.add.text(200 + (idx * 100), 100, item, {
        align: 'center',
        fill: 'white',
        fontFamily: 'sans-serif',
        fontSize: 48,
      })
        .setOrigin(0.5, 0)
    })

    const answers = ['19', '21', '23']

    answers.forEach((item, idx) => {
      const text = this.add.text(300 + (idx * 100), 300, item, {
        align: 'center',
        fill: 'white',
        fontFamily: 'sans-serif',
        fontSize: 48,
      })
        .setOrigin(0.5, 0)

      text.setInteractive(new Phaser.Geom.Rectangle(0, 0, text.width, text.height), Phaser.Geom.Rectangle.Contains)
      text.on('pointerdown', this.onClick, { text, answer })
    })
    
  }

  create () {
    // background
    this.add.image(400, 300, 'space')

    // const emitter = this.add.particles('red')
    //   .createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD',
    //   })

    this.addChallenge()
    
    

    // const logo = this.physics.add.image(400, 100, 'logo')
    //   .setVelocity(100, 200)
    //   .setBounce(1, 1)
    //   .setCollideWorldBounds(true)

    // emitter.startFollow(logo)

    this.input.keyboard
      .on('keydown-R', function () {
        this.scene.restart()
      }, this)
      .on('keydown-Q', function () {
        this.scene.stop().run('menu')
      }, this)
      .on('keydown-K', function () {
        this.scene.stop().run('end')
      }, this)
  }

  update () {}
}
