import new_tile_map from "../Tiled/new_tile_map.js";
export default class preload extends Phaser.Scene{
    preload()
    {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.9);
        progressBox.fillRect(490, 270, 320, 50);
        
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        let assetText = this.make.text({
            x: width / 1,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(490, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            // assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // 임시로 넣어둠. 추후에 변경해야함. 여기서 이미지 리소스를 로드함. 이렇게 for문에 박아두면 쓰레기 코드 timeout등으로 처리.
        this.load.image('logo', './resource/images/loader.png');
        for (let i = 0; i < 100; i++) {
            this.load.image('logo'+i, './resource/images/loader.png');
        }
    }
    create(){
        this.scene.shutdown();
        this.scene.start("new_tile_map");  
    }
   
}