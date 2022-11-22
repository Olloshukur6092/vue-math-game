<template>
    <div class="startGame">
        <div class="start">
            <h1>{{ msg }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    props: ['msg']
}
</script>

<style>
    .startGame {
        position: fixed;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .startGame .start {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .start h1 {
        font-size: 100px;
        color: #fff;
    }
</style>