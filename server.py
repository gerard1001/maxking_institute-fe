import subprocess

def main():
    try:
        # Run the 'npm start' command
        process = subprocess.Popen(['npm', 'start'])
        process.communicate()
    except KeyboardInterrupt:
        print("Server stopped by user")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()