<template>
    <div class="tabs">
        <el-tag
            v-for="(item,index) in tags"
            :key="item.name"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            size="small"
            class="el-tag"
        >
            {{item.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'

export default {
    name: 'Tag',
    data(){
        return {

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList 
        })
    },
    methods:{
        ...mapMutations({
            close: 'closeTag'
        }),
        changeMenu(item){
            this.$router.push({ name: item.name })
        },
        handleClose(item,index) {
            const length = this.tags.length - 1
            this.close(item)
            if(item.name !== this.$route.name) {
                return
            }else{
                if(index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            }else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
            }
            //有Bug，删除中间的会失去焦点
        }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        padding: 18px 20px 0px 14px;
        .el-tag{
            margin: 0 0 0 15px;
            cursor: pointer;
        }
    } 
</style>