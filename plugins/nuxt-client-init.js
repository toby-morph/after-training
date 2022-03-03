export default async ({ store, $config }) => {
    await store.dispatch('steps/setStepsVersions', $config.versions)
    // await store.dispatch('site/setTrialSites')
}