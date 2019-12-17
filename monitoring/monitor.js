const axios = require('axios')

const pagerDutyUrl = 'https://events.pagerduty.com/v2/enqueue';

module.exports = function triggerEvent(error) {
	console.log("creating trigger event...");

	const params =
	{
	  payload: {
	    summary: error.message,
	    timestamp: new Date(),
	    source: process.env.HOST,
	    severity: (error.severity) ? error.severity : "info",
	    component: error.component,
	    group: error.kind,
	    class: "deploy",
	    custom_details: {
	      ping_time: "10ms",
	      load_avg: 0.75
	    }
	  },
	  routing_key: "06a78f8cef5c401d8a19244984f1096b",
	  dedup_key: "samplekeyhere",
	  images: [],
	  links: [],
	  event_action: "trigger",
	  client: "Sample Monitoring Service"
	}

	axios.post(pagerDutyUrl, params)
}




// const reqBody =
// {
//   "payload": {
//     "summary": "Example alert on host1.example.com",
//     "timestamp": "2015-07-17T08:42:58.315+0000",
//     "source": "monitoringtool:cloudvendor:central-region-dc-01:852559987:cluster/api-stats-prod-003",
//     "severity": "info",
//     "component": "postgres",
//     "group": "prod-datapipe",
//     "class": "deploy",
//     "custom_details": {
//       "ping time": "1500ms",
//       "load avg": 0.75
//     }
//   },
//   "routing_key": "samplekeyhere",
//   "dedup_key": "samplekeyhere",
//   "images": [{
//   	"src": "https://www.pagerduty.com/wp-content/uploads/2016/05/pagerduty-logo-green.png",
//   	"href": "https://example.com/",
//   	"alt": "Example text"
//   }],
//   "links": [{
//     "href": "https://example.com/",
//     "text": "Link text"
//   }],
//   "event_action": "trigger",
//   "client": "Sample Monitoring Service",
//   "client_url": "https://monitoring.example.com"
// }