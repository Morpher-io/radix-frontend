<script setup lang="ts">
import { useRadixStore } from '@/stores/radixstore'
import { GatewayProcessor } from '@beaker-tools/typescript-toolkit'
import { RadixNetwork, type WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getPrice } from '@/axios/prices'
import { updatePublicKey } from '@/radix/manifests/updatePublicKey'
import { buyGumballManifest } from '@/radix/manifests/buy_gumball'
import { priceMsgToString } from '@/radix/utils'

const store = useRadixStore()

const { account, radixDappToolkit } = storeToRefs(store)

const props = defineProps({ subscriptionId: String })
console.log(props.subscriptionId)

const gatewayProcessor = GatewayProcessor.fromNetworkId(RadixNetwork.Stokenet)

const exires = ref<undefined | Date>()
const apiCallsUsed = ref<undefined | number>()
const totalApiCalls = ref<undefined | number>()
const authorizedPubKey = ref<undefined | string>()

function makeOracleCall() {
  if (account.value !== undefined && account.value.address !== undefined) {
    getPrice().then(async (payload) => {
      const { data, status } = payload
      const xrdAmount = 1 / data.price
      const buyManifest = buyGumballManifest(
        xrdAmount,
        account.value?.address || '',
        priceMsgToString(data),
        data.signature || ''
      )
      console.log(buyManifest)
      const result = await radixDappToolkit.value?.walletApi.sendTransaction({
        transactionManifest: buyManifest,
        version: 1,
        message: 'Buy one Gumball Token for ' + data.price + ' XRD'
      })

      if (result?.isErr()) {
        throw result.error
      }

      console.log('Buy Subscription result:', result)
      updateSubscription()
    })
  }
}

async function updatePublicKeyForSubscription() {
  if (authorizedPubKey.value && account.value && props.subscriptionId) {
    const manifest = updatePublicKey(
      account.value?.address,
      props.subscriptionId,
      authorizedPubKey.value
    )
    console.log(manifest)
    const result = await radixDappToolkit.value?.walletApi.sendTransaction({
      transactionManifest: manifest,
      version: 1,
      message: 'Change the Public Key to ' + authorizedPubKey.value
    })

    if (result?.isErr()) {
      throw result.error
    }

    console.log('Buy Subscription result:', result)
    updateSubscription()
  }
}

function updateSubscription() {
  if (props.subscriptionId) {
    gatewayProcessor
      .getNonFungibleItemsFromIds(import.meta.env.VITE_ORACLE_SUBSCRIPTION_RESOURCE_ADDRESS, [
        props.subscriptionId
      ])
      .then((item) => {
        exires.value = item[0].non_fungible_data?.get('expiration_time')
          ? new Date(Number(item[0].non_fungible_data?.get('expiration_time')) * 1000)
          : undefined

        apiCallsUsed.value = Number(item[0].non_fungible_data?.get('cur_nonce'))
        totalApiCalls.value = Number(item[0].non_fungible_data?.get('max_nonce'))
        authorizedPubKey.value = item[0].non_fungible_data?.get('authorized_pub_key')
      })
  }
}

onMounted(() => {
  updateSubscription()
})
</script>
<template>
  <div
    class="flex flex-col p-6 mx-auto max-w-lg text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white min-w-full"
  >
    <div class="mb-6 flex flex-col gap-4">
      <div class="">
        <h3 class="mb-4 text-2xl font-semibold">Existing Subscription</h3>
        <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          NFT ID
        </label>
        <input
          type="text"
          id="full_name"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          :value="subscriptionId"
          required
        />
      </div>
      <div class="">
        <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Enrolled Key</label
        >
        <div class="flex flex-row gap-1">
          <input
            type="text"
            id="full_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            v-model="authorizedPubKey"
            required
          />
          <button v-on:click="updatePublicKeyForSubscription()" class="border p-2">💾</button>
        </div>
        <div
          class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
          v-if="authorizedPubKey == undefined || authorizedPubKey.length == 0"
        >
          <span class="font-medium">Attention:</span> Enroll your Public Key to start making requests
        </div>
      </div>

      <div class="">
        <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Expires:</p>
        <p class="mb-2 block text-sm ftext-gray-900 dark:text-white">{{ exires?.toISOString() }}</p>
      </div>
      <div
        class=""
        v-if="apiCallsUsed !== undefined && totalApiCalls !== undefined"
      >
        <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">API Calls:</p>
        <p class="mb-2 block text-sm text-gray-900 dark:text-white">
          {{ apiCallsUsed }} of {{ totalApiCalls }} ({{
            ((totalApiCalls - apiCallsUsed) / totalApiCalls) * 100
          }}% remaining)
        </p>
      </div>
    </div>
  </div>
</template>
