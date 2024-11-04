<script setup lang="ts">
import { useRadixStore } from '@/stores/radixstore'
import { GatewayProcessor } from '@beaker-tools/typescript-toolkit'
import { RadixNetwork, type WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { updatePublicKey } from '@/radix/manifests/updatePublicKey'
import { renewSubscription } from '@/radix/manifests/renewSubscription'

const store = useRadixStore()

const { account, radixDappToolkit } = storeToRefs(store)

const props = defineProps({ subscriptionId: String })
console.log(props.subscriptionId)

const gatewayProcessor = GatewayProcessor.fromNetworkId(import.meta.env.VITE_RADIX_NETWORK_ID == 1 ? RadixNetwork.Mainnet : RadixNetwork.Stokenet)

const exires = ref<undefined | Date>()
const apiCallsUsed = ref<undefined | number>()
const totalApiCalls = ref<undefined | number>()
const authorizedPubKey = ref<undefined | string>()



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

async function renewOracleSubscription() {
  if (authorizedPubKey.value && account.value && props.subscriptionId) {
    const manifest = renewSubscription(
      account.value?.address,
      props.subscriptionId,
      import.meta.env.VITE_ORACLE_SUBSCRIPTION_COMPONENT_ADDRESS == 'component_tdx_2_1cqd5w7as9mq5rzrjtavnaauhtwh7kgu9lxumdtdpqkv3erj0u9dy2n' ? 1000 : 1,
      1
    )
    console.log(manifest)
    const result = await radixDappToolkit.value?.walletApi.sendTransaction({
      transactionManifest: manifest,
      version: 1,
      message: 'Renew Subscirption for another month'
    })

    if (result?.isErr()) {
      throw result.error
    }

    console.log('Renew Subscription result:', result)
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
      <div class="space-y-6">
        <!-- Public Key Section -->
        <div class="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <label for="public_key" class="block text-base font-semibold text-gray-900 dark:text-white mb-2">
            Public Key Enrollment
          </label>
          <div class="flex flex-row gap-2">
            <input
              type="text"
              id="public_key"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              v-model="authorizedPubKey"
              placeholder="Enter your public key"
              required
            />
            <button 
              v-on:click="updatePublicKeyForSubscription()" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 min-w-[120px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
              </svg>
              Save Key
            </button>
          </div>
          <div
            class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            v-if="authorizedPubKey == undefined || authorizedPubKey.length == 0"
          >
            <span class="font-medium">Required:</span> You must enroll a public key before you can make requests
          </div>
        </div>

        <!-- Subscription Status Section -->
        <div class="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-3">Subscription Status</h4>
          <div class="flex flex-col gap-2">
            <div>
              <span class="text-sm text-gray-600 dark:text-gray-400">Expires:</span>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ exires?.toISOString() }}
              </p>
            </div>
            <button 
              v-on:click="renewOracleSubscription()" 
              class="mt-2 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Renew Subscription
            </button>
          </div>
        </div>
      </div>
      <!-- <div
        class=""
        v-if="apiCallsUsed !== undefined && totalApiCalls !== undefined"
      >
        <p class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">API Calls:</p>
        <p class="mb-2 block text-sm text-gray-900 dark:text-white">
          {{ apiCallsUsed }} of {{ totalApiCalls }} ({{
            ((totalApiCalls - apiCallsUsed) / totalApiCalls) * 100
          }}% remaining)
        </p>
      </div> -->
    </div>
  </div>
</template>
