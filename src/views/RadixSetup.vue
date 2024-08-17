<script setup lang="ts">
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
import ToolingIcon from '@/components/icons/IconTooling.vue'
import EcosystemIcon from '@/components/icons/IconEcosystem.vue'
import Subscription from '@/components/Oracle/Subscription.vue'
import { useRadixStore } from '@/stores/radixstore'
import { storeToRefs } from 'pinia'
import { GatewayProcessor } from '@beaker-tools/typescript-toolkit'
import { RadixNetwork, type WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit'
import { onMounted, ref } from 'vue'

import { newSubscription } from '@/radix/manifests/newSubscription'

const store = useRadixStore()
const { account, radixDappToolkit } = storeToRefs(store)
const gatewayProcessor = GatewayProcessor.fromNetworkId(import.meta.env.VITE_RADIX_NETWORK_ID == 1 ? RadixNetwork.Mainnet : RadixNetwork.Stokenet)

const subscriptionIds = ref<undefined | string[]>()

function updateSubscriptions() {
  if (account.value !== undefined) {
    console.log('onmounted finished', account.value)
    console.log('onmounted finished', import.meta.env.VITE_ORACLE_SUBSCRIPTION_RESOURCE_ADDRESS)
    gatewayProcessor
      .getNonFungibleIdsHeldBy(
        account.value.address,
        import.meta.env.VITE_ORACLE_SUBSCRIPTION_RESOURCE_ADDRESS
      )
      .then((ids) => {
        subscriptionIds.value = ids
      })
  } else {
    console.log('account value is undefined', account.value)
  }
}
store.$subscribe((mutation, state) => {
  updateSubscriptions()
})

async function buySubscription() {
  // const manifest = subscriptionId.value
  //   ? renewSubscription(account.address, subscription_id, 300, 1)
  //   : newSubscription(account.address, 300, 1);
  if (account.value) {
    const manifest = newSubscription(account.value.address, 1000, 1)

    const result = await radixDappToolkit.value?.walletApi.sendTransaction({
      transactionManifest: manifest,
      version: 1,
      message:
        subscriptionIds.value && subscriptionIds.value.length > 0
          ? 'Renewing your subscription for another month'
          : 'Buying a one-month subscription'
    })

    if (result?.isErr()) {
      throw result.error
    }

    console.log('Buy Subscription result:', result)
    updateSubscriptions()
  }
}
onMounted(updateSubscriptions)
</script>

<template>
  <article class="max-w-4xl">
    <h2 class="text-4xl font-extrabold dark:text-white">Manage Oracle Subscription</h2>
    <p class="my-4 text-lg text-gray-500">
      Start here for a new subscription or extending an existing subscription.
    </p>

    <div
      v-if="account == undefined"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Attention:</span> Connect your Account to get started
    </div>
    <div v-if="account !== undefined">
      <section class="bg-white dark:bg-gray-900">
        <div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          <Subscription
            v-for="subscriptionId in subscriptionIds"
            :key="subscriptionId"
            :subscriptionId
          />
          <!-- Pricing Card -->
          <div
            class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
          >
            <h3 class="mb-4 text-2xl font-semibold">New Subscription</h3>
            <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Access to all real-time data and on-chain attestation service.
            </p>
            <div class="text-center items-baseline my-8">
              <span class="mr-2 text-3xl line-through">$999</span>
              <div class="flex justify-center items-baseline mb-8">
                <span class="mr-2 text-5xl font-extrabold">$1</span>
                <span class="text-gray-500 dark:text-gray-400">/month*</span>
              </div>
            </div>
            <!-- List -->
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <!-- Icon -->
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Instant Access to Market Data</span>
              </li>
              <li class="flex items-center space-x-3">
                <!-- Icon -->
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>No setup, or hidden fees</span>
              </li>
              <li class="flex items-center space-x-3">
                <!-- Icon -->
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Subscription valid: <span class="font-semibold">1 month</span></span>
              </li>
            </ul>
            <a
              href="#"
              class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-blue-900 transition"
              v-on:click="buySubscription()"
              >Get started</a
            >
            <span class="text-xs text-gray-400 mt-3">* Price valid for the first handful™️ of customers until year end.</span>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
