#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use clap::{arg, Command};

fn main() {
    let context = tauri::generate_context!();

    let cmd = Command::new("KTH DevOps Demo")
        .disable_version_flag(true)
        .version(format! {"v{}", context.package_info().version}.as_str())
        .author("Corentin Guilloteau")
        .arg(arg!(-v - -version))
        .get_matches();

    if cmd.is_present("version") {
        println!("{}", context.package_info().version.as_str());
    } else {
        let _app = tauri::Builder::default()
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
