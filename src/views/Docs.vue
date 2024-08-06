<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Pull vs Push Blockchain Oracles</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-blue-100 p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-2 text-blue-700">Pull Oracles</h2>
        <ul class="list-disc pl-5">
          <li class="mb-2">DApps or Smart contracts actively request data from the oracle</li>
          <li class="mb-2">Data is fetched on-demand</li>
          <li class="mb-2">More control over when and how data is updated</li>
          <li>Better suited for real-time or time-sensitive applications</li>
        </ul>
      </div>

      <div class="bg-green-100 p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-2 text-green-700">Push Oracles</h2>
        <ul class="list-disc pl-5">
          <li class="mb-2">Oracles proactively send data to smart contracts</li>
          <li class="mb-2">Data is updated at predefined intervals or thresholds</li>
          <li class="mb-2">More efficient for data that changes at known intervals</li>
          <li>Less suitable for immediate or real-time data needs</li>
        </ul>
      </div>
    </div>

    <p class="mt-4 text-gray-600">
      The choice between Pull and Push oracles depends on the specific requirements of the
      blockchain application, particularly the frequency and timing of data updates needed.
    </p>

    <div class="mt-4 text-gray-600">
      The Morpher Oracle on Radix is a Pull Oracle. You fetch Data off-chain and then let the user
      send it in the transaction manifest and use it on-chain via an attestation service. Let's dig
      in.
    </div>

    <div
      class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Morpher Oracle API:</span>
      https://dev-test-radix-oracle-api.morpher.com
    </div>
    <div
      class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Morpher Data Feeds:</span>
      <a href="https://dev-test-radix-oracle-api.morpher.com/markets/morpher">https://dev-test-radix-oracle-api.morpher.com/markets/morpher</a>
    </div>

    <h1 class="text-3xl font-bold my-4">How to get started</h1>

    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <li class="mb-10 ms-4">
        <div
          class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Step 1</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Subscribe</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Get a subscription NFT to enroll your public key.
        </p>
        <RouterLink
          to="/radix/setup"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >Subscribe Now
          <svg
            class="w-3 h-3 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            /></svg
        ></RouterLink>
      </li>
      <li class="mb-10 ms-4">
        <div
          class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Step 2</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Generate random 32 Bytes (Private Key)
        </h3>
        <div class="text-base font-normal text-gray-500 dark:text-gray-400">
          Generate a new private key and store it in a secure location. The expected key has a
          length of 32 bytes. There are various functions and modules out there to generate a new
          private key. For NodeJS you could do something like
          <a
            class="underline"
            href="https://github.com/paulmillr/noble-ed25519?tab=readme-ov-file#usage"
            >this</a
          >:

          <div class="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4">
            <div class="overflow-scroll max-h-full">
              <pre><code class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre ">import * as ed from &apos;@noble/ed25519&apos;;
// import * as ed from &quot;https://unpkg.com/@noble/ed25519&quot;; // Unpkg
const privKey = ed.utils.randomPrivateKey(); // Secure random private key
const hexPrivKey = ed.etc.bytesToHex(privKey); //Private Key in Hex Format.
</code></pre>
            </div>
          </div>
        </div>
      </li>
      <li class="ms-4 mb-10">
        <div
          class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Step 3</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Generate a BLS12_381 Public Key and enroll into the NFT
        </h3>
        <div class="text-base font-normal text-gray-500 dark:text-gray-400">
          Generate the Public Key out of the Private Key and enroll the public key into the NFT.
          <div class="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4">
            <div class="overflow-scroll max-h-full">
              <pre><code class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre ">import { bls12_381 as bls } from &apos;@noble/curves/bls12-381&apos;;

export function getPublicKey(privateKey) {
  return Array.from(bls.getPublicKey(privateKey), byte =&gt; byte.toString(16).padStart(2, &apos;0&apos;)).join(&apos;&apos;);
}</code></pre>
            </div>
          </div>
        </div>
      </li>
      <li class="ms-4 mb-10">
        <div
          class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Step 4</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Enroll into the NFT</h3>
        <div class="text-base font-normal text-gray-500 dark:text-gray-400">
          Go back to the Subscription page and enroll your Token.
        </div>
      </li>
      <li class="ms-4 mb-10">
        <div
          class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Step 5</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Enquire the Price of up to 20 Markets
        </h3>
        <div class="text-base font-normal text-gray-500 dark:text-gray-400">
          In your Backend, fetch the market data from the Oracle Backend. For example, any market on
          Binance starts with BINANCE: and of GateIo it starts with GATEIO:. If you want to fetch
          the last price from Radix Tokens, this is how you would do it:
          <div
            class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">Sample Github DApp Backend:</span>
            <a href="https://github.com/Morpher-io/radix-sample-dapp-backend"
              > https://github.com/Morpher-io/radix-sample-dapp-backend</a
            >
          </div>
          <div class="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4">
            <div class="overflow-scroll max-h-full">
              <pre><code class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre ">
                
                export type PricePoint = {
    marketId: string;
    price: number;
    nonce: string;
    createdAt: number;
}

export type PriceMessage = {
    data: PricePoint[];
    signature?: string;
}

export type OracleRequestMessage = {
    marketId: string;
    nonce: number;
    publicKeyBLS: string;
    nftId: string;
    signature: string;
  }
  
export async function getSignatureOracleRequest(marketId: string): Promise&lt;OracleRequestMessage&gt; {

  const nftId = process.env.ORACLE_NFT_ID; //your NFT ID
  const pk = process.env.PK_DAPP; //your private key from a secure storage

  let oracleRequestMsg: OracleRequestMessage = {
    marketId,
    nonce: Number(nonce) + 1,
    publicKeyBLS: getPublicKey(pk),
    nftId,
    signature: &quot;&quot;
  };

  const new_msg = Buffer.from(oracleRequestMsgToString(oracleRequestMsg), &apos;utf8&apos;).toString(&apos;hex&apos;);
  
  let signature = bytesToHex(await bls.sign(new_msg, pk, htfEthereum));

  oracleRequestMsg.signature = signature;


  return oracleRequestMsg;

}

//example of an express service that would use this:
app.get(&quot;/example/getPrice&quot;, async (req: Request, res: Response&lt;PriceMessage&gt;, next) =&gt; {
    try {
        //add some checks if the user really sends the transaction
        //potentially counterfactual transaction so that a user is not bleeding out 
        //the API. This is up to the DAPP developer.
        const nftId = process.env.ORACLE_NFT_ID
      
        const marketId = &quot;GATEIO:XRD_USDT&quot;;

        const signedPriceRequest = await getSignatureOracleRequest(marketId, nonceJson.nonce);

        console.log(signedPriceRequest)
        const signedPriceResponse = await fetch(&grave;${process.env.ORACLE_BACKEND_URL}/price/${marketId}/${signedPriceRequest.publicKeyBLS}/${signedPriceRequest.nftId}/${signedPriceRequest.signature}&grave;);
        const signedPrice: PriceMessage = await signedPriceResponse.json();
        console.log(signedPrice);


        res.json(signedPrice);
    } catch (e) { next(e) }
})
</code></pre>
            </div>
          </div>
        </div>
      </li>
      <li class="ms-4 mb-10">
        <div
          class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Step 6</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Use the Attestation Service
        </h3>
        <div class="text-base font-normal text-gray-500 dark:text-gray-400">
          What you get back is a PriceMessage that is signed and has a timestamp. Add this to the
          manifest and then run the onchain attestation service.
          <div
            class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">Sample Contract:</span> 
            <a
              href="https://github.com/Morpher-io/radix-oracle-contracts/blob/main/src/gumball.rs#L101"
              > https://github.com/Morpher-io/radix-oracle-contracts/blob/main/src/gumball.rs#L101</a
            >
          </div>
          <div class="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4">
            <div class="overflow-scroll max-h-full">
              <pre><code class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre ">
        fn make_all_trading_checks(&amp;mut self, message: String, signature: String) -&gt; PriceMessage {
            let morpher_oracle: Global&lt;MorpherOracle&gt; = self.oracle_address.into();

            let price_message = morpher_oracle.check_price_input(
                // self.subscription.create_proof_of_non_fungibles(&amp;ids),
                message, signature,
            );

            // Check that the price lifetime has not been surpassed
            assert!(
                price_message.created_at + self.price_lifetime &gt;= get_time(),
                &quot;This price is out of date!&quot;
            );

            price_message
        }
</code></pre>
            </div>
          </div>
        </div>
        <div
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Pending Change: Transient Tokens</span> There is a pending
          change and/or an addition to how the current attestation service works. In the future you
          might be able to receive a transient NFT that contains the Price information. This needs
          to be returned back to the oracle throught eh transaction manifest. Join our community
          groups to know when that change will happen.
        </div>
      </li>
    </ol>
  </div>
</template>
