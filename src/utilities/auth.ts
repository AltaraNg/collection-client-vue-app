export default {
    state: {
        user: null
    },
    initialize() {
        this.state.user = JSON.parse(localStorage.getItem('user'));
    },
    set(data: any) {
        localStorage.setItem('user', JSON.stringify(data))
        
        this.initialize()
    },
    remove() {
        localStorage.clear();
        this.initialize()
    }
}
