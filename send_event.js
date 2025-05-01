const core = require("@actions/core");
const axios = require("axios");

async function run() {
  try {
    const accessToken = core.getInput("access_token");
    const jobName = core.getInput("job_name");
    const status = core.getInput("status");

    await axios.post("https://op-api-1oin.onrender.com/ci-event", {
      job: jobName,
      status: status,
      token: accessToken,
    });

    console.log(
      `Sent CI/CD event for job "${jobName}" with status "${status}"`
    );
  } catch (error) {
    core.setFailed(`Failed to send event: ${error.message}`);
  }
}

run();
