import customtkinter as ctk
from datetime import datetime
from message_window import MessageWindow
from PIL import Image, ImageTk
from alert import alertclient
import cv2
import numpy as np


ctk.set_default_color_theme("FaceDetection\cNord_theme.json")
ctk.set_appearance_mode("system")



class App(ctk.CTk):
    def __init__(self): # initializes, for all tkinter code, you find replace app with self
        super().__init__()
        self.title('keysight')
        self.geometry('400x1400+1420+0')
        self.msg_window = None
        self.create_welcome_screen()
        self.minsize(200, 800)




    def back_to_welcome(self):
        for widget in self.winfo_children():
            widget.pack_forget()
        self.create_welcome_screen()

    def get_current_time(self):
        # Returns the current system time as a formatted string
        return datetime.now().strftime('%H:%M')

    def update_time(self, label):
        current_time = self.get_current_time()
        label.configure(text=current_time)
        # Schedule the method to run again after 1000ms (1 second)
        self.after(1000, lambda: self.update_time(label))  # Pass the label argument here

 
    def update_theme(self):
        if (ctk.get_appearance_mode() == "Dark"):
            return "☾"
        else:
            return "☀"
    
    def create_welcome_screen(self):
        self.update_theme()
        self.welcome_frame = ctk.CTkFrame(self)
        self.welcome_frame.pack(side='right', fill='both', expand=True)

        self.top_frame = ctk.CTkFrame(self.welcome_frame)
        self.top_frame.pack(fill='x', pady=20, padx=20)



        battery = ctk.CTkImage(light_image=Image.open("FaceDetection\Battery_light.png"),
                                dark_image=Image.open("FaceDetection\Battery_dark.png"),
                                size=(30, 30))

        self.battery_label = ctk.CTkLabel(self.top_frame, image=battery, text="")  
        self.battery_label.pack(side="left", padx=(65, 10), pady=5)

        self.time_label = ctk.CTkLabel(self.top_frame, text=self.get_current_time())
        self.time_label.pack(side="left", padx=10, pady=10)
        self.update_time(self.time_label)

        self.switch_var = ctk.StringVar(value=ctk.get_appearance_mode())
        self.switch = ctk.CTkButton(self.top_frame, text=self.update_theme(), command=self.theme_event, width=30, height=30)  
        self.switch.pack(side="right", pady=10, padx=10)



        logo_title = ctk.CTkImage(light_image=Image.open("src\styles\Icon.png"),
                                  dark_image=Image.open("src\styles\Icon_light.png"),
                                  size=(70 * 5, 25 * 5))

        self.logo_label = ctk.CTkLabel(self.welcome_frame, image=logo_title, text="")
        self.logo_label.pack(pady=(50, 20))

        ctk.CTkButton(self.welcome_frame, text='Delivery', command=self.show_delivery_menu).pack(pady=10, padx=(10, 0))
        ctk.CTkButton(self.welcome_frame, text='Request to Talk', command=lambda:self.sendTextMessage("Hi, someone is at your door and want to talk to you. Check out our app to see what is going on.")).pack(pady=10, padx=(10, 0))
        ctk.CTkButton(self.welcome_frame, text='Record a Message', command=self.recordMessage, text_color="#FF8360", fg_color="transparent", border_width=0).pack(pady=10, padx=(10, 0))

        waves_title = ctk.CTkImage(light_image=Image.open("FaceDetection\Wave_light.png"),
                                   dark_image=Image.open("FaceDetection\Wave.png"),
                                   size=(70 * 27, 33 * 17))

        self.waves_label = ctk.CTkLabel(self.welcome_frame, image=waves_title, text="")
        self.waves_label.pack(pady=(40, 0))

    def show_delivery_menu(self):
        self.welcome_frame.pack_forget()
        self.login_frame = ctk.CTkFrame(self)
        self.login_frame.pack(fill='both', expand=True)

        ctk.CTkLabel(self.login_frame, text='Select Service', font=("Arial", 55, "bold")).pack(pady=(80,20))

        # Login Button
        ctk.CTkButton(self.login_frame, text='Mail', command=lambda:self.sendTextMessage("Mail is at the door")).pack(pady=10)
        ctk.CTkButton(self.login_frame, text='Amazon', command=lambda:self.sendTextMessage("Amazon is at the door")).pack(pady=10)
        ctk.CTkButton(self.login_frame, text='Uber Eats', command=lambda:self.sendTextMessage("Uber Eats is at the door")).pack(pady=10)
        ctk.CTkButton(self.login_frame, text='Other', command=lambda:self.sendTextMessage("Delivery is at the door")).pack(pady=10)

        ctk.CTkButton(self.login_frame, text='Back', command=self.back_to_welcome).pack(pady=10)
        
        bg_image = ctk.CTkImage(light_image=Image.open("FaceDetection\Wave_light.png"),
                                  dark_image=Image.open("FaceDetection\Wave.png"),
                                  size=(70 * 27, 33 * 17))
        self.logo_label = ctk.CTkLabel(self.login_frame, image=bg_image, text="")
        self.logo_label.pack(pady=(70, 0))

    def sendTextMessage(self, text):
        alertclient(text)
        print("test")


    def recordMessage(self):
        print("optional: allow the user to send a voice message to the homeowner phone")

    def show_message(self, title, msg):
        if self.msg_window is None or not self.msg_window.winfo_exists():
            self.msg_window = MessageWindow(title, msg)  
        else:
            self.msg_window.focus() 
        print(msg)

    

    def theme_event(self):
        print("Button clicked, current value:", ctk.get_appearance_mode())
        if ctk.get_appearance_mode() == "Light":
            ctk.set_appearance_mode("dark")
            self.switch.configure(text="☾")
            self.switch_var.set("dark")
        else:
            ctk.set_appearance_mode("light")
            self.switch.configure(text="☀")
            self.switch_var.set("light")



if __name__ == '__main__':
    app = App()
    app.mainloop()