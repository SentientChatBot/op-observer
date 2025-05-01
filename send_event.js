const core = require("@actions/core");
const axios = require("axios");

async function run() {
  try {
    const accessToken = core.getInput("access_token") || "0";
    const status = core.getInput("status");

    // const jobName = core.getInput("job_name");
    const jobName = process.env.GITHUB_JOB;

    const repo = process.env.GITHUB_REPOSITORY;
    const commit = process.env.GITHUB_SHA;
    const ref = process.env.GITHUB_REF;
    const actor = process.env.GITHUB_ACTOR;
    const workflow = process.env.GITHUB_WORKFLOW;
    const runId = process.env.GITHUB_RUN_ID;
    const runAttempt = process.env.GITHUB_RUN_ATTEMPT;
    const runNumber = process.env.GITHUB_RUN_NUMBER;
    const runUrl = `${process.env.GITHUB_SERVER_URL}/${repo}/actions/runs/${runId}`;
    const server = process.env.GITHUB_SERVER_URL;

    await axios.post("https://op-api-1oin.onrender.com/ci-event", {
      job: jobName,
      status: status,
      token: accessToken,
      repo,
      commit,
      ref,
      actor,
      workflow,
      runId,
      runAttempt,
      runNumber,
      runUrl,
      server,
    });

    console.log(
      `Sent CI/CD event for job "${jobName}" with status "${status}"`
    );
  } catch (error) {
    core.setFailed(`Failed to send event: ${error.message}`);
  }
}

run();
