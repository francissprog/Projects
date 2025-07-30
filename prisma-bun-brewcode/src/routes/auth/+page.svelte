<script lang="ts">
	import { hoverUtils } from '$lib/utils/hoverUtils.js';
	import errorMessage from '$lib/utils/errorMessage.js';
	import axios from 'axios';
	import { emailRegex } from '$lib/utils/emailFormat';
	import { goto } from '$app/navigation';
	import message from '$lib/utils/message';
    import { Eye, EyeOff } from 'lucide-svelte';
	// Static variables for demonstration
	const imageURL =
		'https://static.vecteezy.com/system/resources/previews/026/771/391/large_2x/minimalist-coffee-background-free-photo.jpeg';

	let loading = false;
	let showPassword = false;
	let passwordState = '';
	const onLogin = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const userData = new FormData(e.target as HTMLFormElement);

		// userData initiallization
		const emailorUsername = (userData.get('emailorUsername') as string) || '';
		let email;
		let username;
		const password = (userData.get('password') as string) || '';

		// form validation
		if (!emailorUsername || !password) {
			errorMessage({ message: 'Please input all fields', icon: 'question' });
			loading = false;
			return;
		}
		// Email regex for validation

		// ternary operator abuser
		emailRegex.test(emailorUsername)
			? (email = userData.append('email', emailorUsername))
			: (username = userData.append('username', emailorUsername));

		try {
			const response = await axios.post('api/auth', userData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			console.log(response);

			// status validation
			if (response.status === 200) {
				message(response.data.message, 'success');
				setTimeout(() => goto('/dashboard'), 1200);	
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				errorMessage({ message: error.response?.data.message, icon: 'warning' });
			}
			//  log for error handling
			console.log(error);
		} finally {
			loading = false;
		}
	};
</script>

<section class="h-[90vh] overflow-hidden flex justify-center items-center bg-coffee">
	<!-- container -->
	<div class="border border-white w-[800px] h-auto flex flex-row rounded-3xl">
		<img
			src={imageURL}
			alt="coffee for login"
			class="aspect-[9/16] h-[500px] rounded-l-3xl w-[40%]"
		/>
		<div class="flex justify-center w-[60%] py-10">
			<!-- form -->
			<form class="flex flex-col gap-5 items-center justify-between py-2" on:submit={onLogin}>
				<span class="text-5xl tracking-wider font-bold">LOGIN</span>
				<div class="flex flex-col gap-8">
					<input
						type="text"
						name="emailorUsername"
						class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
						autocomplete="off"
						placeholder="Enter your email/username"
					/>
					<div class="w-full relative">
						{#if showPassword}
							<input
								type="text"
								autocomplete="off"
								name="password"
								class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
								placeholder="Enter your password"
								bind:value={passwordState}
							/>
							<button on:click={() => (showPassword = !showPassword)} class="absolute right-2 top-2"
								><Eye /></button
							>
						{:else}
							<input
								type="password"
								name="password"
								class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
								placeholder="Enter your password"
								bind:value={passwordState}
							/>
							<button on:click={() => (showPassword = !showPassword)} class="absolute right-2 top-2"
								><EyeOff /></button
							>
						{/if}
					</div>
					<button
						class={`${loading ? 'cursor-not-allowed' : hoverUtils} border p-2`}
						disabled={loading}
					>
						{#if loading}
							<div
								role="status"
								class="inline-block h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							></div>
						{:else}
							<span>Login</span>
						{/if}
					</button>
					<!-- Register link -->
					<span
						>Doesn't Have an Account? <a href="/auth/register" class="underline">Register Here</a>
					</span>
				</div>
			</form>

    </div>
	</div>
</section>
