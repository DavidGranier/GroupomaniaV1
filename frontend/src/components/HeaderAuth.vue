<template>
    <nav class="headerauth">
        <router-link :to="{name:'Home'}" title="Acceuil"><img class="logogroupomania" src="../assets/icon-left-font-monochrome-white.svg" alt="Groupomania"></router-link>
        <div class="headerauth__icon">
            <router-link :to="{name:'Settings'}" title="Options"><i class="fas fa-cog fa-2x boutonsetings"></i></router-link>
        </div>
    </nav> 
</template>

<style lang='scss' scoped>

    .headerauth{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>img {
            margin-left: 20px;
            height: 30px;
        }
        
    }


    .logogroupomania{
        margin-left: 20px;
            height: 30px;
    }
    .boutonsetings{
        color: white;
        margin-right: 20px;
    }
    .boutonprofil{
        color: white;
        margin-right: 20px;
    }

</style>