<!-- CallbackView.vue -->
<script setup lang="ts">
import { useLogto } from "@logto/vue";
const { signIn } = useLogto();
signIn("http://127.0.0.1:5173/callback");
</script>
