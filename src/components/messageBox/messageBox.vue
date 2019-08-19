<template>
    <div class="messageBox">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div>
            <div @touchstart="handleCancel">{{ cancel }}</div>
            <div @touchstart="handleOk">{{ ok }}</div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .messageBox
        width 200px
        height 120px
        border 1px solid #ccc
        border-radius 4px
        background white
        box-shadow 3px 3px 3px 3px #ccc
        position absolute
        left 50%
        top 50%
        margin-left -100px
        margin-top -60px
        h2
            text-align center
            line-height 40px
            font-size 18px
        p
            text-align center
            line-height 40px
        div
            display flex
            width 100%
            border-top 1px solid #ccc
            position absolute
            bottom 0
            div 
                position relative
                line-height 30px
                flex-grow  1
                display block
                text-align center
                border none 
                border-right 1px solid #cccccc
                &:last-child
                    border none
</style>
