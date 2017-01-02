System.register(['@angular/router', './app.login.component', './app.logout.component', './app.content.component', './app.signup.component', './app.profile.component', './app.report.component', './guards/app.guard'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_login_component_1, app_logout_component_1, app_content_component_1, app_signup_component_1, app_profile_component_1, app_report_component_1, app_guard_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_login_component_1_1) {
                app_login_component_1 = app_login_component_1_1;
            },
            function (app_logout_component_1_1) {
                app_logout_component_1 = app_logout_component_1_1;
            },
            function (app_content_component_1_1) {
                app_content_component_1 = app_content_component_1_1;
            },
            function (app_signup_component_1_1) {
                app_signup_component_1 = app_signup_component_1_1;
            },
            function (app_profile_component_1_1) {
                app_profile_component_1 = app_profile_component_1_1;
            },
            function (app_report_component_1_1) {
                app_report_component_1 = app_report_component_1_1;
            },
            function (app_guard_1_1) {
                app_guard_1 = app_guard_1_1;
            }],
        execute: function() {
            appRoutes = [
                { path: 'main', component: app_content_component_1.contentComponent, canActivate: [app_guard_1.AuthGuard] },
                { path: 'profile', component: app_profile_component_1.profileComponent, canActivate: [app_guard_1.AuthGuard] },
                { path: 'login', component: app_login_component_1.loginComponent },
                { path: 'logout', component: app_logout_component_1.logoutComponent },
                { path: 'signup', component: app_signup_component_1.signupComponent },
                { path: 'report', component: app_report_component_1.reportComponent },
                { path: '', redirectTo: '/login', pathMatch: 'full' },
                { path: '**', redirectTo: '' }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
