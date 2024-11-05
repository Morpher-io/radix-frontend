<script setup lang="ts">
import { useRadixStore } from '@/stores/radixstore'
import { storeToRefs } from 'pinia'
import { getPrice } from '@/axios/prices'
import { buyGumballManifest } from '@/radix/manifests/buy_gumball'
import { priceMsgToString } from '@/radix/utils'

const store = useRadixStore()
const { account, radixDappToolkit } = storeToRefs(store)

function buyGumball() {
  if (account.value !== undefined && account.value.address !== undefined) {
    getPrice().then(async (payload) => {
      const { data, status } = payload
      const xrdAmount = 1 / data.data[0].price
      const buyManifest = buyGumballManifest(
        xrdAmount + 1,
        account.value?.address || '',
        priceMsgToString(data),
        data.signature || ''
      )
      console.log(buyManifest)
      const result = await radixDappToolkit.value?.walletApi.sendTransaction({
        transactionManifest: buyManifest,
        version: 1,
        message: 'Buy one Gumball Token for ' + data.data[0].price + ' XRD'
      })

      if (result?.isErr()) {
        throw result.error
      }

      console.log('Buy Subscription result:', result)
    })
  }
}
</script>

<template>
  <article class="flex flex-col md:flex-row gap-3 justify-between md:items-start">
    <div
      class="basis-1/2 p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-row justify-between">
        <div>
          <h2 class="text-4xl font-extrabold dark:text-white">Get yourself a Gumball</h2>
          <p class="my-4 text-sm text-gray-500">
            To see how it works, get yourself a Gumball denominated in USD.
          </p>
        </div>
        <div>
          <p class="text-blue-700 bg-blue-100 text-xs p-1">1 USD buys 1 Gumball</p>
        </div>
      </div>

      <div class="flex flex-row gap-3">
        <div class="">
          <img src="@/assets/gumball_machine.webp" width="180" class="min-w-20" />
        </div>
        <div class="">
          <div v-if="account == undefined">Connect your Wallet to get started!</div>
          <div v-if="account != undefined">
            <p class="my-4 text-sm text-gray-500">Your Address: {{ account?.address }}</p>
            <button
              v-on:click="buyGumball()"
              class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Buy yourself a Gumball for 1 USD
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="basis-1/2 p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h2 class="text-4xl font-extrabold dark:text-white">How it works</h2>
      <p class="mt-8 text-gray-700 dark:text-gray-300">
        The Gumball Machine demonstrates how to use the Morpher Oracle in a real-world scenario. Here's how it works:
      </p>
      <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
        <li>The machine sells gumballs for exactly $1 USD each</li>
        <li>When you click buy, it fetches the current XRD/USD price from Gate.io through our Oracle</li>
        <li>The price data comes with a cryptographic signature that proves its authenticity</li>
        <li>Our smart contract verifies the signature and calculates how many XRD equals $1</li>
        <li>If the verification succeeds, you receive one gumball token for your XRD payment</li>
      </ul>
      <p class="mt-4 text-gray-700 dark:text-gray-300">
        This demonstrates secure price feeds, signature verification, and atomic swaps - core building blocks for DeFi applications.
      </p>
    </div>
  </article>
</template>
