
> このページを開く [https://skytree-1.github.io/acceleration-game/](https://skytree-1.github.io/acceleration-game/)
```template

function getMax (array: number[]) {
    max = array[0]
    i = 1
    while (i < array.length) {
        if (max < array[i]) {
            max = array[i]
        }
        i += 1
    }
    return max
}
let i = 0
let max = 0
let data: number[] = []


```

[チュートリアル全体を表示](https://skytree-1.github.io/acceleration-game/tutorial)

# 加速度ゲームを作ろう！
加速度ゲームを作りながら配列操作について学ぶチュートリアルです。
配列の要素の最大値を求める部分は getMax(配列)という関数を利用します。


## このチュートリアルで学ぶこと

- 配列の利用
- 繰り返し処理を使って調べる方法
- もし〜ならブロックの利用
- 関数の利用

## チュートリアル

詳しい手順は `tutorial.md` を参照してください。

## 実行

* [チュートリアルを実行](https://makecode.microbit.org/#tutorial:github:SKYTREE-1/acceleration-game/tutorial) 
