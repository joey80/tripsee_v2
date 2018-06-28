<template>
    <div class="logo-container">
        <div>
            <div>
                <img src="../assets/images/logo.png" class="logo" />
                <!-- trip<span class="light">see</span> -->
            </div>
            <!-- <div class="tripsee-subtitle">
                Discover Your Next Favorite Place
            </div> -->
        </div>
        <span class="icon tripsee-menu" @click="handleClick">
            <i class="fas fa-bars"></i>
        </span>
    </div>
</template>

<script>
    import { eventBus, state } from '../main';

    export default {
        methods: {
            handleClick() {
                console.log('you clicked me!');
                eventBus.$emit('menuClick', 'on');
            }
        }
    }

</script>

<style scoped>
    .logo-container {
        display: flex;
        padding: 10px 20px 0 20px;
        justify-content: space-between;
    }
    .logo {
        max-width: 250px;
    }
    .tripsee-logo {
        font-family: 'Antic Slab', serif;
        font-size: 2.8em;
        color: #7fa953;
    }
    .tripsee-subtitle {
        transform: translateY(-2px);
        font-family: 'Muli', sans-serif;
        font-size: 0.8em;
        color: #a6a9b9;
        font-weight: bold;
        font-style: italic;
    }
    .tripsee-menu {
        padding-top: 10px;
        color: #7fa953;
        font-size: 1.3em;
        cursor: pointer;
    }
    .light {
        font-family: 'Muli', sans-serif;
        color: #ade16d;
        font-size: 0.9em;
        letter-spacing: -3px;
    }
</style>