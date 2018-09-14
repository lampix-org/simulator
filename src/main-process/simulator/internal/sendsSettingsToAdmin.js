const sendsSettingsToAdmin = (
  state,
  updateAdminUI
) => ({
  sendSettingsToAdmin() {
    const { settings, watcherData } = state;
    updateAdminUI({
      settings,
      watcherData
    });
  }
});

exports.sendsSettingsToAdmin = sendsSettingsToAdmin;
