export const dates = {
    computed: {
        currentDate() {
            // const currentDate = this.$dateFns.format(new Date(), 'yyyyMMdd')
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            return yyyy + mm + dd
          },
    },
    // methods: {
    //     // ACF dateTime field saves dates as string 'YYYYMMDD'
    //     // returns this as a string with format 'dd/MM/yyyy'
    //     formatAcfDate(acfDate, format = 'numeric') {
    //         if(!acfDate) return false
            
    //         const dateToFormat = this.parseAcfDate(acfDate)
    //         const dateFormat = format === 'verbose' ? 'do LLL yyyy' : 'dd/MM/yyyy'
    //         return this.$dateFns.format(dateToFormat, dateFormat)
    //     },
    //     formatDayOfWeek(acfDate) {
    //         if(!acfDate) return false

    //         const dateToFormat = this.parseAcfDate(acfDate)
    //         return this.$dateFns.format(dateToFormat, 'cccc')
    //     },
    //     // e.g. '16th December 2021 at 3:21pm'
    //     formatAcfDateTime(acfDateTime) {
    //         if(!acfDateTime) return false
            
    //         const dateToFormat = this.parseAcfDateTime(acfDateTime)
    //         return this.$dateFns.format(dateToFormat, 'do LLL yyyy') + ' at ' + this.$dateFns.format(dateToFormat, 'h:mmaaaa')
    //     },
    //     // ACF dateTime field saves dates as string 'YYYYMMDD'
    //     // returns this as a JS Date
    //     parseAcfDate(acfDate) {
    //         return this.$dateFns.parse(acfDate, 'yyyyMMdd', new Date())
    //     },
    //             // ACF dateTime field saves dates as string 'YYYYMMDD'
    //     // returns this as a JS Date
    //     parseAcfDateTime(acfDateTime) {
    //         return this.$dateFns.parse(acfDateTime, 'yyyy-MM-dd HH:mm:ss', new Date())
    //     },
    // }
}
