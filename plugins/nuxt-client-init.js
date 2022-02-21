export default async ({ store, $config }) => {
    await store.dispatch('steps/setStepsVersions', $config.versions)
}