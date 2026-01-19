


actor {
  var currentTask : Text = "No task set";

  public query ({ caller }) func getCurrentTask() : async Text {
    currentTask;
  };

  public shared ({ caller }) func updateCurrentTask(newTask : Text) : async () {
    currentTask := newTask;
  };
};
