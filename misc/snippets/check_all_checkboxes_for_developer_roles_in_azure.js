let checkboxes = document.querySelectorAll("#_weave_e_2207 > div > div > div.fxs-lens-layout > div > div.fxs-part.fxs-part-no-fx-content-padding.fxs-part-for-template-blade > div.fxs-part-content.fxs-validationContainer.css-scope-Microsoft_AAD_IAM.css-scope-BladesEnterpriseAppscss.css-scope-BladesAppListcss.css-scope-BladesCustomAppAddButtonPartscss.css-scope-BladesManagedAppscss.css-scope-BladesSettingscss.css-scope-BladesSingleSignOncss.css-scope-BladesDevicesAreaStylescss.css-scope-BladesDirectoriesAreaStylescss.css-scope-BladesColumnChooserStylescss.css-scope-BladesControlsInColumnscss.css-scope-BladesFilterControlcss.css-scope-BladesPillFiltercss.css-scope-BladesSharedAreaStylescss.css-scope-BladesBladeWithGridcss.css-scope-BladesFindControlcss.css-scope-BladesSelectorcss.css-scope-BladesLicensescss.css-scope-BladesMultifactorAuthenticationcss.css-scope-BladesPasswordResetAreaStylescss.css-scope-BladesSelectorAndGridStylescss.css-scope-BladesClassicPoliciescss.css-scope-BladesPoliciesAreaStylescss.css-scope-BladesSpotlightStylescss.css-scope-BladesUserProvisioningcss.css-scope-BladesUsersAreaStylescss.css-scope-BladesDirectoryRolescss.fxt-mq-minw-375 > div > div.msportalfx-docking-body.msportalfx-padding > div.fxc-base.fxc-list-focus.fxc-list-selection.fxc-listView.azc-fabric > ul > li > span.fxc-listView-checkbox.azc-checkBox")
checkboxes = Array.from(checkboxes)
checkboxes.forEach((x,i)=>{
  x.click()
})


let azureRolesCheckBoxes = document.querySelectorAll("div.fxc-base.fxc-list-focus.fxc-list-selection.fxc-listView.azc-fabric > ul > li > span.fxc-listView-checkbox.azc-checkBox")
function clickAllCheckboxes(myNodeList){

  checkboxes = Array.from(myNodeList)
  checkboxes.forEach((x,i)=>{
    x.click()
  })
}
clickAllCheckboxes(azureRolesCheckBoxes)