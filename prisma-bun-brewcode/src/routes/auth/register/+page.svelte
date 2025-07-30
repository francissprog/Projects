<script lang="ts">
	import { goto } from '$app/navigation';
	import errorMessage from '$lib/utils/errorMessage';
	import { hoverUtils } from '$lib/utils/hoverUtils';
	import message from '$lib/utils/message';
	import axios from 'axios';
	import { Eye, EyeOff } from 'lucide-svelte';

	// Static data
	const imageURL =
		'https://static.vecteezy.com/system/resources/previews/026/771/391/large_2x/minimalist-coffee-background-free-photo.jpeg';

	let loading = false;
	let showPassword = false;
	let showConfirmPassword = false;
	// value initialize in show password
	let passwordState = '';
	let confirmPasswordState = '';

	const onRegister = async (e: Event) => {
		e.preventDefault();
		loading = true;

		// get the data
		const userData = new FormData(e.target as HTMLFormElement);
		// initialize the data
		const username = userData.get('username') as string | null;
		const email = userData.get('email') as string | null;
		// form validation
		if (!username || !email || !passwordState || !confirmPasswordState) {
			errorMessage({ message: 'Please input all fields', icon: 'question' });
			loading = false;
			return;
		}

		// validate if the user is writely corrected his/her password
		if (passwordState !== confirmPasswordState) {
			errorMessage({ message: 'Incorrect Password', icon: 'question' });
			loading = false;
			return;
		}

		// post data to the api/auth/register
		try {
			const response = await axios.post('/api/auth/register', userData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});

			// response status success
			if (response.status === 200) {
				message(response.data.message, 'success');
				setTimeout(() => goto('/dashboard'), 1200);
			}
		} catch (error) {
			// if error occurs to axios post
			if (axios.isAxiosError(error)) {
				errorMessage({ message: error.response?.data.message, icon: 'error' });
			}
			
		} finally {
			loading = false;
		}
	};
</script>

<section class="h-[90vh] overflow-hidden flex justify-center items-center bg-coffee">
	<!-- container -->
	<div class="border border-white w-[800px] h-auto flex flex-row rounded-3xl">
		<img src={imageURL} alt="coffee for login" class="aspect-[9/16] h-auto rounded-l-3xl w-[40%]" />
		<div class="flex justify-center w-[60%] py-10">
			<!-- form -->
			<form class="flex flex-col gap-5 items-center justify-between py-2" on:submit={onRegister}>
				<span class="text-5xl tracking-wider font-bold">REGISTER</span>
				<div class="flex flex-col gap-8">
					<input
						type="text"
						class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
						placeholder="Enter your username"
						name="username"
						autocomplete="off"
					/>
					<input
						type="email"
						class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
						placeholder="Enter your email"
						name="email"
						autocomplete="off"
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
							<button
								on:click={() => (showPassword = !showPassword)}
								class="absolute right-2 top-2"
								type="button"><Eye /></button
							>
						{:else}
							<input
								type="password"
								name="password"
								class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
								placeholder="Enter your password"
								bind:value={passwordState}
							/>
							<button
								on:click={() => (showPassword = !showPassword)}
								class="absolute right-2 top-2"
								type="button"><EyeOff /></button
							>
						{/if}
					</div>
					<div class="w-full relative">
						{#if showConfirmPassword}
							<input
								type="text"
								autocomplete="off"
								name="confirmPassword"
								class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
								placeholder="Confirm Password"
								bind:value={confirmPasswordState}
							/>
							<button
								on:click={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute right-2 top-2"
								type="button"><Eye /></button
							>
						{:else}
							<input
								type="password"
								name="password"
								class="bg-transparent border-b-2 border-white focus:border-white focus:outline-none p-2 placeholder:text-gray-300 w-full"
								placeholder="Confirm Password"
								bind:value={confirmPasswordState}
							/>
							<button
								on:click={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute right-2 top-2"
								type="button"><EyeOff /></button
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
							<span>Register</span>
						{/if}
					</button>

					<span>Already Have an Account? <a href="/auth/" class="underline">Login Here</a> </span>
				</div>
			</form>
		</div>
	</div>
</section>
