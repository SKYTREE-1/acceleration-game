# アクセルチャレンジ（MAX ACCELERATION!）

## STEP1 アクセルチャレンジ@showdialog

-- 加速度を利用したゲームを作ろう --

 - micro:bit を握って、思い切り肘を引いてみよう！
 - 5回の記録から、自分のBESTを見つけよう。

![ゲームのイメージ](https://skytree-1.github.io/acceleration-game/images/img01.png)



## STEP2 加速度って何？ @showdialog

micro:bit の加速度センサーを使って、肘をひく動作によってできる加速度の強さを測定します。

micro:bit では、x, y, z 方向の加速度を利用できますが、今回は強さに注目したいので「絶対値（Strength）」を使います。
絶対値は、３方向合わせた加速度の大きさで、単位は mg（ミリジー）で、最大値は 4095 mg です。


![加速度とは](https://skytree-1.github.io/acceleration-game/images/img02.png)

※ g（ジー）は、重力加速度（micro:bit では、1024mg ≒ 1g ≒ 9.8 m/s²）。

## STEP3 加速度を記録しよう @showdialog

１回の動作ごとに、最大の加速度を求めて配列に入れ、５回の動作のうちの最大の値を取り出すことを考えます。


肘を強くひく動作をするときにかかる加速度は一定ではありません。
変化する中の最大の値を１回の動作での結果として記録します。

![動作中の加速度の変化](https://skytree-1.github.io/acceleration-game/images/img03.png)

今回は、配列の要素の最大値を求める関数は ``||function:getMax()||`` を利用します。
また、結果を入れる配列は data という配列を利用します。

## STEP3-0 配列の初期化
最初に、配列data を初期化します。
``||basic:最初だけ||`` に ``||variables:変数 data を（）にする||`` 入れて、 ``||array:配列||`` にある``||array:空の配列||`` をセットします。


## STEP3-1 変数の作成
はじめに、最大加速度と加速度、動作を始めた時間を入れる変数を作ります。
``||variables:変数を追加する||`` から、個の変数 max_acceleration, acceleration, start_time を作成します。

## STEP3-2 仮の数値の代入 
``||input:ボタン A が押されたとき||``を配置して、``||variables:変数 max_acceleration||`` を0にします。
また、``||variables:変数 start_time ||`` を``||input:稼働時間||`` にします。


```blocks
input.onButtonPressed(Button.A, function () {
    max_acceleration = 0
    start_time = input.runningTime()
})
```


## STEP3-3 くり返しの設定

``||loop:もし <偽> ならくりかえし||`` を出して、  <偽> の部分に ``||logic: 論理||``にある「くらべるブロック」から ``||logic: ()<()||`` ブロックをセットして 右辺に1000（ms）を入れます。

```blocks

input.onButtonPressed(Button.A, function () {
    max_acceleration = 0
    start_time = input.runningTime()
    while ((0 as any) < (1000 as any)) {
    }
})
```

## STEP3-3 くり返しの設定（つづき）
くらべるブロックの不等号の左側に、``||math:()-()||`` ブロックを使って、``||input:稼働時間||`` から ``||variables:start_time||`` を引いたものが 1000 (ms)より小さい間となるようにします。

```blocks
input.onButtonPressed(Button.A, function () {
    max_acceleration = 0
    start_time = input.runningTime()
    while (input.runningTime() - start_time < 1000) {
	}
})
```

## STEP3-4 加速度の取得
``||loop: くりかえし||`` ブロックの一番上で、変数 ``||variables: acceleration ||`` に ``||input:加速度（絶対値）||``を代入します。

```blocks
input.onButtonPressed(Button.A, function () {
    max_acceleration = 0
    start_time = input.runningTime()
    while (input.runningTime() - start_time < 1000) {
        acceleration = input.acceleration(Dimension.Strength)
	}
})
```

## STEP3-5 もし〜ならブロックの利用
``||logic: 論理||``の``||logic: もし〜なら||``ブロックを``||loop:くりかえし||``の中に入れます。

```blocks
input.onButtonPressed(Button.A, function () {
    let data: number[] = []
    max_acceleration = 0
    start_time = input.runningTime()
    while (input.runningTime() - start_time < 1000) {
        acceleration = input.acceleration(Dimension.Strength)
        if (true) {
    	}
	}
})
```

## STEP3-5 もし〜ならブロックの利用（つづき）
``||logic: もし〜なら||``ブロックの条件に ``||variables:max_acceleration|`` が ``||variables:acceleration|`` より小さいという条件を加えて、
このとき、``||variables: max_acceleration||``を``||variables:acceleration|`` にします。

```blocks
input.onButtonPressed(Button.A, function () {
    let data: number[] = []
    max_acceleration = 0
    start_time = input.runningTime()
    while (input.runningTime() - start_time < 1000) {
        acceleration = input.acceleration(Dimension.Strength)
        if (max_acceleration < acceleration) {
            max_acceleration = acceleration
        }
    }
})
```

## STEP3-6 動作チェック
ここまできたら、最後に ``||basic:数を表示||``  ``||variables:max_acceleration||`` を最後に追加して、ダウンロードして実際に動かしてみましょう。
動作を確認したら次へ進みますが、次に進む前に「``||basic:数を表示||`` 」ブロックは、必ず消してください。


```blocks
input.onButtonPressed(Button.A, function () {
    let data: number[] = []
    max_acceleration = 0
    start_time = input.runningTime()
    while (input.runningTime() - start_time < 1000) {
        acceleration = input.acceleration(Dimension.Strength)
        if (max_acceleration < acceleration) {
            max_acceleration = acceleration
        }
    }
    basic.showNumber(max_acceleration)
})
```

## STEP4 結果を配列に入れる @showdialog

STEP3-6で追加した「``||basic:数を表示||`` 」ブロックを消してから、先に進んでください。

ここまでで１回分の動作の結果（最大加速度）が求められました。
この結果を、配列に入れて管理します。

![結果をリストに](https://skytree-1.github.io/acceleration-game/images/img04.png)

## STEP4 結果を配列に入れる（つづき）
``||loop: くりかえし||``ブロックの次に、``||array: 配列||``から``||array: data の最後に max_acceleration を追加する||`` をセットします。

```blocks
input.onButtonPressed(Button.A, function () {
    let data: number[] = []
    max_acceleration = 0
    start_time = input.runningTime()
    while (input.runningTime() - start_time < 1000) {
        acceleration = input.acceleration(Dimension.Strength)
        if (max_acceleration < acceleration) {
            max_acceleration = acceleration
        }
    }
    data.push(max_acceleration)
})
```

## STEP5 5回のチャレンジの流れ

ここまでで、１回の動作について、動作をはじめてから記録を配列に入れるまでのプログラムを作りました。
ここで、全体の５回のチャレンジの流れを確認してみましょう。

![結果をリストに](https://skytree-1.github.io/acceleration-game/images/img05.png)

合図の音が鳴り、動作をして測定する。記録したら、２回目のチャレンジ ... 5回まで終わったら結果を表示というようになります。


## STEP5-1 くり返しの追加（５回のチャレンジ）
``||loop: くりかえし||``の ``||loop: 変数カウンターを0〜4に変えてくりかえす||``を ``||input:ボタンAが押されたとき||``の一番上に追加して、
そこに、ここまでで作ったプログラムを全部入れます。

```blocks
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        let data: number[] = []
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
        data.push(max_acceleration)
    }
})
```

## STEP5-2 何回目かを表示する
``||basic: 数を表示||`` を使って、何回目かを表示します。
``||variables:カウンター||``に１を足したものを表示するといいです。
``||variables:カウンター||``はリストにはないので、くり返しブロックのところにあるものをひっぱってきて当てはめます。

```blocks
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        basic.showNumber(カウンター + 1)
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.showNumber(カウンター + 1)
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
    }
})
```

## STEP5-3 合図の音を出す
音楽ブロックを使って、回数を表示した後に準備、計測開始のわかるようなメロディを追加してください。

```blocks
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        basic.showNumber(カウンター + 1)
        for (let index = 0; index < 3; index++) {
            music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.rest(music.beat(BeatFraction.Whole))
        }
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.showNumber(カウンター + 1)
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
    }
})
```

## STEP5-4 チャレンジの間隔を調整する

``||basic:一時停止||`` を使って、間隔を入れます。

```blocks
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        basic.showNumber(カウンター + 1)
        for (let index = 0; index < 3; index++) {
            music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.rest(music.beat(BeatFraction.Whole))
        }
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.showNumber(カウンター + 1)
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
        basic.pause(1000)
    }
})
```

## STEP6 結果を表示する @showdialog
５回のチャレンジが終わったら、結果を表示しよう。

![結果をみよう](https://skytree-1.github.io/acceleration-game/images/img06.png)


## STEP6 結果を表示する

結果の数値を表示する前に、``||basic:文字列を表示||`` で「BEST:」と表示してから、``||basic:数を表示||``で、
関数 ``||function:getMax(data)||`` を表示します。

```blocks
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        basic.showNumber(カウンター + 1)
        for (let index = 0; index < 3; index++) {
            music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.rest(music.beat(BeatFraction.Whole))
        }
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.showNumber(カウンター + 1)
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
        basic.pause(1000)
    }
    basic.showString("BEST:")
    basic.showNumber(getMax(data))
})
```
## STEP6 結果を表示する（つづき）
ここまできたら、ダウンロードして micro:bit で動かしてみよう。
一度、5回のチャレンジが終了した後、もう一度チャレンジするときは、micro:bitの背面にある、リセットボタンを押してから始めてください。



```blocks
let max_acceleration = 0
let start_time = 0
let acceleration = 0
let data: number[] = []
let average = 0
let 配列: number[] = []
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        basic.showNumber(カウンター + 1)
        for (let index = 0; index < 3; index++) {
            music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.rest(music.beat(BeatFraction.Whole))
        }
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.showNumber(カウンター + 1)
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
        basic.pause(1000)
    }
    basic.showString("BEST:")
    basic.showNumber(getMax(data))
})
```

## STEP6 結果を見てみよう（発展）@showdialog
余裕のある人は、Bボタンを押したら各回の記録を表示したり、A＋Bボタンで平均値を表示するなどにも取り組んでみましょう。

```blocks
let max_acceleration = 0
let start_time = 0
let acceleration = 0
let data: number[] = []
let average = 0
let 配列: number[] = []
input.onButtonPressed(Button.A, function () {
    for (let カウンター = 0; カウンター <= 4; カウンター++) {
        basic.showNumber(カウンター + 1)
        for (let index = 0; index < 3; index++) {
            music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.rest(music.beat(BeatFraction.Whole))
        }
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        basic.showNumber(カウンター + 1)
        max_acceleration = 0
        start_time = input.runningTime()
        while (input.runningTime() - start_time < 1000) {
            acceleration = input.acceleration(Dimension.Strength)
            if (max_acceleration < acceleration) {
                max_acceleration = acceleration
            }
        }
        basic.pause(1000)
    }
    basic.showString("BEST:")
    basic.showNumber(getMax(data))
})
input.onButtonPressed(Button.AB, function () {
    for (let カウンター = 0; カウンター <= data.length - 1; カウンター++) {
        average += 配列[カウンター]
    }
    average = Math.round(average / data.length)
    basic.showNumber(average)
})
input.onButtonPressed(Button.B, function () {
    for (let カウンター = 0; カウンター <= data.length - 1; カウンター++) {
        basic.showNumber(配列[カウンター])
    }
})
```

## STEP7 完成！@showdialog



![Let's Make a Function!](https://skytree-1.github.io/acceleration-game/images/image07.png)


## STEP8 発展 @showdialog
もっと工夫をしてみてください。
![Let's Make a Function!](https://skytree-1.github.io/acceleration-game/images/image08.png)