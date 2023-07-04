<!-- CallbackView.vue -->
<script setup lang="ts">
import { useLogto } from "@logto/vue";
const { signIn } = useLogto();
signIn(import.meta.env.VITE_APP_INDEX+"/callback");
</script>
